import Profile from "views/components/basic/profile/Profile";
import HelmetSEO from "views/utils/HelmetSEO";

const ProfilePage = () => {
  return (
    <HelmetSEO
      title='Profile | DaGif'
      description='DaGif Profile Page'
    >
      <Profile />
    </HelmetSEO>
  )
}

export default ProfilePage;