function showProfile({user}) {
  return (
    <div className="">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
    </div>
   );
}

export default showProfile;
