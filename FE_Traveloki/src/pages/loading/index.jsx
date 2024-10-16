import Loading from './loading'
function load() {
  return (
    <div
      className="flex items-center justify-center py-9 min-h-screen bg-center bg-cover"
      // style={{
      //   backgroundImage:
      //     "url('https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w4N3x8ZW58MHx8fHx8')",
      // }}
    >
    <Loading />
    </div>
   );
}

export default load;
