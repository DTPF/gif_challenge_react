import GifForm from "views/components/basic/gifForm/GifForm";
import HelmetSEO from "views/utils/HelmetSEO";

const GifFormPage = () => {
  return (
    <HelmetSEO
      title='Gif Form | DaGif'
      description='DaGif Gif Form Page'
    >
      <GifForm />
    </HelmetSEO>
  )
}

export default GifFormPage;