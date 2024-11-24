# 바닐라 JS 프로젝트 성능 개선

- url: 🔗 [Vercel 4-2.basic.app](https://front-3rd-chapter4-2-basic-beryl.vercel.app/)

---

## 성능 개선 보고서

![prev_performance](https://artinfo.s3.ap-northeast-2.amazonaws.com/prod/upload/1710/images/20241124/original/3wqTosmbi_H.1732424869490.png)

### 기존 성능

| 변수명      | 측정값 |
| ----------- | ------ |
| FCP         | 0.7s   |
| LCP         | 1.4s   |
| TBT         | 0.15s  |
| CLS         | 0.418  |
| Speed Index | 0.7s   |

<br />

---

![prev_performance](https://artinfo.s3.ap-northeast-2.amazonaws.com/prod/upload/1710/images/20241124/original/Nrqvt5WjiNA.1732424945855.png)

### 개선 후 성능

| 변수명      | 측정값 |
| ----------- | ------ |
| FCP         | 0.6s   |
| LCP         | 1.8s   |
| TBT         | 0s     |
| CLS         | 0.005  |
| Speed Index | 1.2s   |

### 기존 코드의 문제점과 개선방법

#### 1. 프로덕트 이미지 크기가 이미지 크기가 미리 지정되어 있지 않아 레이아웃 시프트가 발생합니다.

- 이미지 크기를 미리 지정해주어 레이아웃 시프트를 방지하였습니다.

#### 2. 테스트용 heavy operation 코드가 있어 메인 스레드가 블로킹되는 문제가 있습니다.

- 메인 스레드를 블로킹하는 문제를 해결하기 위해 setTimeout을 사용하여 비동기적으로 처리하였습니다.
- 무거운 연산을 청크로 나누어 처리하는 함수를 작성하였습니다.

#### 3. 이미지 lazy loading으로 초기 로딩 시간을 단축하고 필요한 시점에 이미지를 로드하도록 개선하였습니다.

#### 4. 폰트와 스타일시트 Preloading 설정 `<link rel="preload">`

기존 코드는 한번에 천만번의 연산을 한꺼번에 처리하다 보니 브라우저가 멈추는 현상이 발생했습니다. 이로 인해 TBT가 0.15s가 발생했습니다. 이를 개선하기 위해 전체 작업을 1000개씩 나누어 처리하고, setTimeout을 활용해 다음 작업을 대기열에 넣어두는 방식으로 변경했습니다. 덕분에 TBT가 0s로 개선되었습니다.
