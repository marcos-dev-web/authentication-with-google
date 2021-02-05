import { OAuth2Client } from 'google-auth-library';

const client_id = process.env.CLIENT_ID;
const client = new OAuth2Client(client_id);

const verify = async (token) => {
  let ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_id,
  });
  let payload = ticket.getPayload();
  let userid = payload['sub'];

  return userid;
}

export default verify;