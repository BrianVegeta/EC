return (
  <TextField placeholder="暱稱" />
  <TextField icon={IconPhone} placeholder="手機號碼" />
  <TextField icon={IconMail} placeholder="Email" />
  <TextField
    icon={IconVerified}
    placeholder="請輸入驗證碼"
    suffix={sendVerifyButton}
    suffixWidth={110}
  />
  <TextField
    icon={IconLock}
    placeholder="密碼"
    suffix={forgotPassword}
    suffixWidth={60}
    type="password"
  />
  <TextField
    icon={IconLock}
    placeholder="密碼確認"
    type="password"
  />
);
