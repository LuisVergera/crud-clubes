async function handlePost(e, callback, team, tla) {
  e.preventDefault();

  const body = new FormData();
  body.append('crest', team.crest);
  body.append('name', team.name);
  body.append('venue', team.venue);
  body.append('colors', team.colors);
  body.append('address', team.address);
  body.append('phone', team.phone);
  body.append('founded', team.founded);

  const postedTeam = await callback(body, tla);

  return postedTeam;
}

export default handlePost;
