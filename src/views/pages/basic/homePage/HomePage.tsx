import HomeBasic from "src/views/components/basic/homeBasic/HomeBasic";
import HelmetSEO from "src/views/utils/HelmetSEO";

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