import Swal from 'sweetalert2';
import { useDownload } from '../../hooks/useDownload';

const DownloadButton = ({ url, filename = 'file.mp4', children }) => {
  const { downloadFile } = useDownload();

  const handleClick = async () => {
    if (!url) return;

    Swal.fire({
      title: 'Preparing download...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await downloadFile(url, filename);

      Swal.close(); // close loading first

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Download started',
        showConfirmButton: true,
        timer: 1500,
        toast: true,
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Download failed',
        text: 'Please try again later',
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className='px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition'
    >
      {children || 'Download'}
    </button>
  );
};

export default DownloadButton;
