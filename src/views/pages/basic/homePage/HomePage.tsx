import HomeBasic from "views/components/basic/homeBasic/HomeBasic";
import HelmetSEO from "views/utils/HelmetSEO";

const HomePage = () => {
  return (
    <HelmetSEO
      title='Home | DaGif'
      description='DaGif Home Page'
    >
      <HomeBasic />
    </HelmetSEO>
  )
}

export default HomePage;