# 위치 지도 이미지 프리로드: 개선 전·후

`ToLocationButton` 호버 시 상세(또는 모달)에서 보여줄 **위치 지도 이미지**를 미리 받아 두려는 흐름과, ImageKit·`next/image` 커스텀 로더와의 **URL 일치** 문제를 어떻게 다뤘는지 정리한다.

## 배경: 왜 프리로드가 필요한가

- 위치 상세로 이동한 직후 지도 이미지가 늦게 뜨면 체감 지연이 크다.
- 호버 시점에 네트워크를 미리 쓰면, 클릭 이후 LCP 구간에서 캐시 히트를 기대할 수 있다.

## 개선 전

### 동작

1. `onMouseEnter`에서 `new Image()`에 **`getLocationImageSrc(location)`** 만 할당했다.
2. `getLocationImageSrc`는 ImageKit **원본 경로**만 반환한다 (쿼리 없음). 예: `https://ik.imagekit.io/…/location1.jpg`.
3. 상세 페이지의 `<Image src={getLocationImageSrc(...)} />`는 `next.config`의 **커스텀 로더**(`imageKitLoader`)를 거친다. ImageKit 호스트면 **`tr=w-…,q-…,f-auto`** 가 붙은 URL로 요청된다.

### 문제

| 구분 | 프리로드(호버) | 상세 `<Image>` |
|------|----------------|----------------|
| URL | 원본만 (`?` 없음) | `?tr=w-640,q-75,f-auto` 등 (예시) |
| 브라우저 캐시 키 | 문자열 A | 문자열 B → **A ≠ B** |

- 캐시는 **URL 전체**를 기준으로 하므로, 프리로드한 리소스와 상세에서 요청하는 리소스가 **다른 것**으로 취급된다.
- 결과: 프리로드 이후에도 상세에서 **같은 이미지를 다시 요청**하고, 이전에 받은 바이트는 재사용되지 않는다.
- 또한 원본만 요청하면 **변환 없이 큰 용량**이 내려올 수 있어, 실제로 쓰는 최적화 버전(예: 작은 `w`)과 이중으로 받는 꼴이 된다.

### 관찰 포인트 (DevTools Network)

- Initiator가 `ToLocationButton`인 요청: 파일명만 보이거나 `tr` 없음.
- Initiator가 `page.tsx`(또는 모달 페이지)인 요청: `tr=w-…,q-75,…` 포함.
- 두 요청이 **동시에 200**으로 찍히는 경우, 캐시 재사용이 아니라 **별도 리소스**로 받은 것에 가깝다.

---

## 개선 후

### 목표

프리로드 URL을 **커스텀 로더가 상세에서 만들 URL과 같은 규칙**으로 맞춘다.

### 구조 요약

1. **`imageKitLoader.ts`**
   - `buildImageKitUrl(src, width, quality?)`를 분리·export.
   - 기본 export 로더는 내부에서 `buildImageKitUrl`만 호출 → **단일 진실 공급원**.
2. **`app/utils/locationMapImagePreload.ts`**
   - Next 기본 `imageSizes` + `deviceSizes`를 합친 후보 너비 목록(`ALL_WIDTH_CANDIDATES`)을 둔다 (`next.config`에서 덮어쓰지 않은 경우와 동기).
   - `LOCATION_MAP_IMAGE_SIZES`와 맞추기 위해 슬롯 너비를 계산한다 (`getLocationMapSlotWidthCssPx`).
   - `슬롯 × DPR`에 맞는 **가장 작은 후보 너비**를 고른다 (`pickNextImageSrcsetWidth`).
   - 위치 지도 `<Image>`는 `quality` 미지정 → **q=75**로 `buildImageKitUrl` 호출 (`getLocationMapPreloadUrl`).
3. **`ToLocationButton.tsx`**
   - 호버 시 `getLocationMapPreloadUrl(location, innerWidth, devicePixelRatio)`로 프리로드 URL 생성.

### 개선 전·후 비교

| 항목 | 개선 전 | 개선 후 |
|------|---------|---------|
| 프리로드에 쓰는 문자열 | `getLocationImageSrc`만 | `buildImageKitUrl(getLocationImageSrc, width, 75)`와 동일 규칙 |
| `tr` 파라미터 | 없음 | 상세 `<Image>`와 동일 형식 (`w-`, `q-`, `f-auto`) |
| `width` | 없음(암묵적 원본) | 뷰포트·DPR·Next 후보 목록으로 추정한 `w` |
| 캐시 | 상세 요청과 불일치 가능성 큼 | 동일 URL이면 **디스크/메모리 캐시 재사용 가능** |

### 알려진 한계

- 브라우저가 `srcset`+`sizes`에서 고르는 너비와, 호버 시점에 계산한 너비가 **항상 100% 일치한다고 보장할 수는 없다** (창 크기 변경, 레이아웃 차이 등).
- `next.config`의 `images.deviceSizes` / `imageSizes`를 바꾸면 **`locationMapImagePreload.ts`의 배열**도 같이 맞춰야 한다.
- `LOCATION_MAP_IMAGE_SIZES`나 레이아웃(패딩·`max-w`)이 바뀌면 **`getLocationMapSlotWidthCssPx`** 가정도 검토해야 한다.

---

## 관련 파일

| 파일 | 역할 |
|------|------|
| `imageKitLoader.ts` | ImageKit용 `tr` 조합 (`buildImageKitUrl` + 기본 로더) |
| `app/utils/locationMapImagePreload.ts` | 호버 프리로드용 URL 계산 |
| `app/utils/util.ts` | `getLocationImageSrc` (원본 base URL) |
| `app/utils/constants.ts` | `LOCATION_MAP_IMAGE_SIZES` 등 |
| `app/components/ToLocationButton.tsx` | 호버에서 `getLocationMapPreloadUrl` 호출 |
| `app/location/[id]/page.tsx` | 위치 지도 `<Image>` |
| `app/@locationModal/(.)location/[id]/page.tsx` | 모달 위치 지도 `<Image>` |
| `next.config.ts` | `loaderFile: ./imageKitLoader.ts` |

---

## 검증 팁

1. Network에서 호버로 발생한 이미지 요청의 **전체 URL**과, 상세 진입 후 같은 이미지 요청의 **전체 URL**을 비교한다.
2. `tr`의 `w`, `q`가 동일하고, Initiator만 다르면(하나는 버튼, 하나는 페이지) **캐시에서 재사용**되는지 확인한다(환경에 따라 Size 컬럼에 `(disk cache)` 등).
