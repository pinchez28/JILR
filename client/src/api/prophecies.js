import { useEffect, useState } from 'react';
import { prophecyApi } from '../../api/prophecies';

import MediaCard from '../../components/ui/media/MediaCard';
import Pagination from '../../components/ui/Pagination';
import SearchInput from '../../components/ui/SearchInput';
import { TimelineDivider } from '../../components/ui/timelineDivider';

const Prophecies = () => {
  const [prophecies, setProphecies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProphecies();
  }, [page]);

  const loadProphecies = async () => {
    setLoading(true);

    try {
      const data = await prophecyApi.getAll(page, search);
      const list = Array.isArray(data) ? data : [];
      setProphecies(list);
    } catch (err) {
      console.error('Failed to load prophecies:', err);
      setProphecies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto px-6 py-10'>
      <h1 className='text-lg md:text-3xl font-extrabold text-secondary text-center uppercase underline decoration-secondary/30 underline-offset-8 mb-6'>
        Prophecies
      </h1>

      <SearchInput
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className='space-y-8'>
        {prophecies.map((p, index) => (
          <div key={p.id}>
            <MediaCard
              type={p.media_type || 'video'}
              src={p.media_file || p.video_file}
              title={p.title}
              description={p.description}
              date={p.prophecy_date}
              downloadable={p.is_downloadable}
              downloadUrl={p.media_file}
            />

            {p.fulfillments?.length > 0 ? (
              p.fulfillments.map((f) => (
                <div
                  key={f.id}
                  className='mt-4 pl-6 border-l-2 border-secondary/30'
                >
                  <MediaCard
                    type={f.media_type || 'video'}
                    src={f.media_file}
                    title={`Fulfillment: ${f.description || ''}`}
                    description={f.description}
                    date={f.fulfillment_date}
                    downloadable={f.is_downloadable}
                    downloadUrl={f.media_file}
                  />
                </div>
              ))
            ) : (
              <div className='text-center py-4'>
                <p className='text-primary dark:text-secondary font-semibold italic'>
                  Awaiting Fulfillment...
                </p>
              </div>
            )}

            {index < prophecies.length - 1 && <TimelineDivider />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prophecies;
