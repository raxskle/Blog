let getUrlPage = function (): string  {
  let url = location.search;

  let theRequest :any = {};
  if (url.indexOf("?") != -1) {
    let str = url.slice(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  let page = theRequest.page;
  if (page === "" || page == null) {
    page = "1";
    // router.push("/");
  }
  return page;
};

export { getUrlPage };