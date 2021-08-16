async function testAuthentication(parent, args, context, info) {
  const { userId } = context;
  return userId;
}

export { testAuthentication };
