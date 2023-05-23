import Profile from "src/views/components/basic/profile/Profile";
import HelmetSEO from "src/views/utils/HelmetSEO";

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