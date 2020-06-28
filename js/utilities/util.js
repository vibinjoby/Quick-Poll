function getHeader() {
  const token = localStorage.getItem("token");
  let header = {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZWVkMGFiNTYzNGRkOTQ0MGZhZWFkNGMiLCJuYW1lIjoieWFkaHUiLCJlbWFpbCI6InlhZGh1ZWthbWJhcmFtMTk5MkBnbWFpbC5jb20iLCJfX3YiOjB9.LtXvmo8CZxfbgkgDr2eowx6ih-mhV-OvYlurUeaA2Rc",
    "Content-Type": "application/json",
  };

  return header;
}

export { getHeader };
