import GifForm from "src/views/components/basic/gifForm/GifForm";
import HelmetSEO from "src/views/utils/HelmetSEO";

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