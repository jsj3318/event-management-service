# event-management-service

# 실행 방법
1. 레포지토리 클론
2. 루트 디렉토리 에서 (docker-compose.yml 있는 디렉토리) 도커 컴포즈 실행 
`docker-compose up --build` (몽고 db에 초기데이터 자동 삽입)
3. 실행 후 아래 swagger 링크로 api 명세 확인 가능
3. 도커 종료 `docker-compose down -v`

---
# api
### swagger api 문서

auth 서버 http://localhost:3100/api

event 서버 http://localhost:3200/api

---
## 서버 포트
* gateway server: 3000
* auth server: 3100
* event server: 3200
* mongo db: 27017
---
# 권한
* USER
* AUDITOR
* OPERATOR
* ADMIN
---
# Test Access Token
테스트에 사용 가능한 권한별 액세스 토큰 (만료시간 없음)

USER - user@test.com
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODI4MzEzMmI4NzI5NDgwN2VhODYxYjUiLCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzY0MjU4NH0.9oIk4aOr3fyv2B5jhukKFHLxlLmo_VIHKsok83w2YII`

AUDITOR - auditor@test.com
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODI4MzRmZmI1NzQ5ZGMyYWJiODk3M2IiLCJlbWFpbCI6ImF1ZGl0b3JAdGVzdC5jb20iLCJyb2xlIjoiQVVESVRPUiIsImlhdCI6MTc0NzY0MjU3MH0.TUzjdXaP4p9tjMUxz2fj1QAKHFC5AZrta1-2vNB5AIg`

OPERATOR - operator@test.com
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODI4MzUwOWI1NzQ5ZGMyYWJiODk3M2YiLCJlbWFpbCI6Im9wZXJhdG9yQHRlc3QuY29tIiwicm9sZSI6Ik9QRVJBVE9SIiwiaWF0IjoxNzQ3NjQyNjAwfQ.P5Jxnnz-1ppBRlfuyWPIdB7ZGQ8dVfovC6Ww-Qk7WcA`

ADMIN - admin@test.com
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODI4MzUxMWI1NzQ5ZGMyYWJiODk3NDMiLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQ3NjQyNjE2fQ.IwUFSV84M4tAvnkO0RTXFSjag6UBM6YB9WvrbEnsL4M`

공통 패스워드 = 1234

## payload
```json
{
  "sub": "68283132b87294807ea861b5",
  "email": "user@test.com",
  "role": "USER",
  "iat": 1747643183,
  "exp": 1747646783
}
```

---
# 권한 검증 구조

고민한 검증 구조 후보들
## 1. AuthGuard + AccessGuard
게이트웨이에서 엔드포인트들의 접근 가능 권한을 정의 해 둠.
```
{ method: 'GET', path: /^\/auth\/?$/, roles: [Role.USER] },
{ method: 'GET', path: /^\/auth\/me$/, roles: [Role.USER, Role.AUDITOR, Role.OPERATOR] },
...
```
프록시 컨트롤러가 클라이언트에서 오는 모든 요청을 한번에 받고, 위 목록에서 접근 가능 권한을 찾아서 걸러냄.

### 이 구조의 장점
* 게이트웨이에서 하나의 프록시 컨트롤러가 모든 요청을 받아서 처리할 수 있음.
* 게이트웨이에 api를 잘 추가만 해두면, api 패스에 권한을 안 넣어도 됨.
* 서비스 엔드포인트를 재사용 할 수 있음.

### 이 구조의 단점
* api가 추가될 때마다 게이트웨이에서 반드시 권한을 명시해줘야 함.
* 권한에 따라서 같은 api를 호출해도 받을 수 있는 데이터가 다를 경우, 서비스 api 에서 요청에 있는 권한으로 데이터를 정제해야 함.

## 2. AuthGuard + RolesGuard - 권한 별 프록시
서비스 api 엔드포인트의 첫 부분에 `/admin` `/user` 등을 붙여놓고, 각 권한별 프록시 컨트롤러를 만든다.

서비스 서버에서는 권한별로 api를 모두 분리한다.

### 이 구조의 장점
* 게이트웨이에 엔드포인트 별 권한을 명시 해놓지 않아도 됨.
* 서비스 api에서 권한을 검사해서 데이터 정제를 하지 않아도 됨.

### 이 구조의 단점
* 권한이 다르지만 같은 로직을 하는 api가 있을 경우, **코드가 중복 됨**.
* api가 많아질 경우 코드의 양이 많아질 수 있음.

## 2. AuthGuard + RolesGuard - 모든 api 정의
서비스 api 엔드포인트에 권한을 명시하지 않고, 모든 api에 대해서 게이트웨이에서 프록시 컨트롤러를 만든다.

서비스 서버에서는 권한별로 api를 모두 분리한다.

### 이 구조의 장점
* api 하나마다 `@roles()`에 여러 권한을 넣어서 명확하게 할 수 있고 재사용 할 수 있음.

### 이 구조의 단점
* api가 생길 때마다 게이트웨이에도 컨트롤러 추가해야 함.

> 고민 끝에 **1번** 방법으로 결정.
> 
> 가장 큰 이유는 코드가 길어지거나 중복되는 것을 지양하기 때문에, 모든 요청을 한 번에 받아서 처리할 수 있는 프록시 컨트롤러가 매력적으로 느껴졌음.

---
# Gateway Server
모든 요청을 받아서 auth 서버나 event 서버로 연결 해주는 라우터 역할
[access_rules](./gateway/src/middleware/access_rules.ts)에 미리 정의해 둔 api 별 접근 권한으로 헤더의 Jwt 토큰을 파싱한 결과와 비교
1. api를 찾지 못하면 404
2. 필요한 권한이 없는 api 일 경우 통과
3. 인증 토큰이 없을 경우 401
4. admin 일 경우 통과
5. 필요한 권한이 없을 경우 403

---
# Auth Server
user 스키마를 관리하고, 로그인 요청을 받아 액세스 토큰을 발급해주는 역할
* 로그인 요청 시 jwt 액세스 토큰 발급 (1시간)
* 내 정보 조회 가능
* 유저 등록, 조회 (단건, 페이지)

---
# Event Server
이벤트 관련 스키마들을 관리하고, 유저 별 이벤트 진척도 관리, 유저 보상 요청 처리 역할

## 이벤트
* 이벤트 생성 (operator, admin)
* 이벤트 조회 (단건, 페이지)
* 이벤트 수정 (부분 수정 가능)

## 보상
* 보상 생성, 수정, 삭제 (operator, admin)
* 보상 조회 (이벤트 별)

## 유저-이벤트 진행도
* 유저-이벤트 진행도 조회 (로그인 필요)
* 유저 이벤트 진행도 증가 (프론트가 생기면 프론트 시스템의 요청인지 검사 필요, 지금은 열려있음)
  * 목표에 도달하면 증가 안함

## 보상 요청
* 보상 요청 (유저)
  * 진행중인 이벤트인지, 이미 보상 받았는지 검사
  * 진행도를 검사해서 성공 여부 기록
* 내 요청 내역 확인 (유저) - 페이지, 필터 가능
* 요청 목록 조회 (auditor, operator, admin) - 페이지, 필터 가능

---
### 시간 나면 해보고 싶은 것

- 리프레쉬 토큰
- createdAt 쿼리 파라미터를 날짜만으로 필터
- sortBy 정렬 쿼피 파라미터로 여러개의 정렬 조건 받기
