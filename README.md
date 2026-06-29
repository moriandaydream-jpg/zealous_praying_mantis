# 소설 창작도우미 Jekyll Web

GitHub Pages에서 바로 쓸 수 있는 Jekyll 기반 소설 창작도우미입니다.

## 포함 기능

- 아이디어 씨앗 생성
- 플롯 질문 생성
- 캐릭터 갈등 힌트
- 세계관 규칙 힌트
- 장면 점검 체크리스트
- 작업 메모와 창작 메모 브라우저 저장
- Admin 메뉴의 화면 레이아웃 설정
- 히어로 커버 이미지

## GitHub Pages 배포

1. 이 폴더의 파일을 `new-novel` GitHub 저장소 루트에 올립니다.
2. 저장소 이름이 `new-novel`이면 `_config.yml`의 `baseurl`을 그대로 둡니다.
3. 저장소 이름을 바꾸면 `_config.yml`의 `baseurl`도 `"/저장소이름"`으로 바꿉니다.
4. GitHub 저장소에서 `Settings > Pages`로 이동합니다.
5. `Build and deployment`의 Source를 `Deploy from a branch`로 설정합니다.
6. Branch를 `main` / `/root`로 선택합니다.
7. 잠시 뒤 Pages URL에서 창작도우미를 엽니다.

## 로컬 실행

Ruby와 Bundler가 설치되어 있다면 아래 명령으로 확인할 수 있습니다.

```bash
bundle install
bundle exec jekyll serve
```

브라우저에서 `http://localhost:4000/new-novel/`을 열면 됩니다.

## 저장 방식

Admin 메뉴의 화면 설정과 작업 메모는 브라우저의 `localStorage`에 저장됩니다. 서버나 로그인 없이, 현재 브라우저에만 남습니다.
