import { OAuth2Client } from 'google-auth-library';

const client_id = process.env.CLIENT_ID;
const client = new OAuth2Client(client_id);

export const verify = async (token) => {
  let ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_id,
  });
  let payload = ticket.getPayload();
  return {
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  }
}

export const checkAuthenticated = (req, res, next) => {
  let token = req.cookies['session-token'];

  verify(token)
    .then((resp) => {
    req.user = resp;
    next();
  })
  .catch((err) => {
    res.redirect('/login');
  })
}