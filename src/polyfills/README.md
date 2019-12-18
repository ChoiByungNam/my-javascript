# Polyfill 사용

새로운 웹 API 사용 시 가능하면 polyfill을 사용하여 호환성 대응할 것.

Polyfill들은 필요 없어지면 제거하기 쉽도록 `src/polyfills` 디렉토리에 모아둘 것.

각 polyfill들은 `src/polyfills/index.js` 파일에서 모두 import하고 이 파일은
Entry 파일 상단에서 한번만 import 할 것.
