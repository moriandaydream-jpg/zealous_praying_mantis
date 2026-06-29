# 소설 창작도우미 Jekyll Web

GitHub Actions로 빌드해서 `github.io`에 배포하는 Jekyll 기반 소설 창작도우미입니다.

## 포함 기능

- 아이디어 씨앗 생성
- 플롯 질문 생성
- 캐릭터 갈등 힌트
- 세계관 규칙 힌트
- 장면 점검 체크리스트
- 작업 메모와 창작 메모 브라우저 저장
- Admin 메뉴의 화면 레이아웃 설정
- 히어로 커버 이미지

## 배포

1. 이 폴더의 파일을 `zealous_praying_mantis` GitHub 저장소 루트에 올립니다.
2. 저장소 이름이 `zealous_praying_mantis`이면 `_config.yml`의 `baseurl`을 그대로 둡니다.
3. 저장소 이름을 바꾸면 `_config.yml`의 `baseurl`도 `"/저장소이름"`으로 바꿉니다.
4. `.github/workflows/deploy.yml`도 함께 커밋합니다.
5. GitHub 저장소에서 `Settings > Pages`로 이동합니다.
6. `Build and deployment`의 Source를 `GitHub Actions`로 설정합니다.
7. `main` 브랜치에 push하면 Actions가 Jekyll을 빌드하고 배포합니다.

`github.io` URL로 보여주려면 배포 대상은 GitHub Pages가 됩니다. 다만 빌드와 배포는 브랜치 배포가 아니라 이 저장소의 GitHub Actions 워크플로가 처리합니다.

## GitHub Actions

워크플로 파일:

```text
.github/workflows/deploy.yml
```

이 사이트는 정적 결과물로 배포되지만, Jekyll의 Liquid 템플릿과 `_config.yml` 처리가 필요하므로 Actions에서 빌드합니다.

배포가 실패하면 GitHub 저장소의 `Actions` 탭에서 `Build and deploy Jekyll site` 실행 로그를 확인하세요.

## 로컬 실행

Ruby와 Bundler가 설치되어 있다면 아래 명령으로 확인할 수 있습니다.

```bash
bundle install
bundle exec jekyll serve
```

브라우저에서 `http://localhost:4000/zealous_praying_mantis/`을 열면 됩니다.

## 저장 방식

Admin 메뉴의 화면 설정과 작업 메모는 브라우저의 `localStorage`에 저장됩니다. 서버나 로그인 없이 현재 브라우저에만 남습니다.
