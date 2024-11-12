import ProfilePanel from  './profilePanel'
// import AdminPanel from './administrationPanel'
function mainProfile() {
    return (
        <div className="w-full px-[42px] py-[41px] border-[#dee0e2] border-[1px] rounded-2xl justify-center items-center flex">
          <div className='w-full flex flex-col justify-center items-center'>
          <ProfilePanel />
          {/* <AdminPanel /> */}
          </div>
        </div>
     );
}

export default mainProfile;
