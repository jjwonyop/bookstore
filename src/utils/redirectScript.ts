// 페이지가 그려지기 전에 실행되는 리다이렉트 스크립트 (_document.tsx의 <Head>에 인라인으로 삽입)
//
// 규칙
// - iwagle.com?go=<키>          : REDIRECT_KEYS에 등록된 목적지로 이동 (예: go=unba → 언어의바다.com)
// - ?go=<URL> (iwagle.com, www, books) : URL의 호스트가 ALLOWED_TARGET_HOSTS에 있을 때만 그 URL로 이동
// - iwagle.com?mcp_token=...    : ManyChat(인스타 DM) 링크 → 언어의바다.com (iwagle.com에서만)
// go가 mcp_token보다 우선한다. 허용 목록 밖의 URL은 무시한다(오픈 리다이렉트 방지).

const UNBA_URL = "https://xn--2j1b67og3hpa59r.com/"; // 언어의바다.com

export const REDIRECT_CONFIG = {
  mainHost: "iwagle.com",
  goUrlHosts: ["iwagle.com", "www.iwagle.com", "books.iwagle.com"],
  keys: { unba: UNBA_URL } as Record<string, string>,
  allowedTargetHosts: ["xn--2j1b67og3hpa59r.com", "www.xn--2j1b67og3hpa59r.com"],
  manychatTarget: UNBA_URL,
};

type RedirectConfig = typeof REDIRECT_CONFIG;

// 브라우저에서 그대로 실행되므로 외부 import나 클로저 변수를 쓰지 않는다
function runRedirect(config: RedirectConfig) {
  try {
    const host = location.hostname;
    const params = new URLSearchParams(location.search);
    const go = params.get("go");
    let target: string | null = null;

    if (go) {
      if (host === config.mainHost && Object.prototype.hasOwnProperty.call(config.keys, go)) {
        target = config.keys[go];
      } else if (config.goUrlHosts.indexOf(host) !== -1) {
        try {
          const url = new URL(go);
          if (url.protocol === "https:" && config.allowedTargetHosts.indexOf(url.hostname) !== -1) {
            target = url.href;
          }
        } catch (e) {
          // URL 형식이 아니면 무시
        }
      }
    }

    if (!target && host === config.mainHost && params.has("mcp_token")) {
      target = config.manychatTarget;
    }

    if (target) location.replace(target);
  } catch (e) {
    // 리다이렉트 실패 시 현재 페이지를 그대로 보여준다
  }
}

export const redirectScript = `(${runRedirect.toString()})(${JSON.stringify(REDIRECT_CONFIG)});`;
