const Loading = () => {
  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <img
        src='/marker.png'
        alt='Image 1'
        className='animate-move1 absolute left-0 top-1/2 h-[40px] w-[40px] -translate-y-1/2 transform'
      />
      <img
        src='/marker.png'
        alt='Image 2'
        className='animate-move2 absolute left-0 top-1/2 h-[40px] w-[40px] -translate-y-1/2 transform'
      />
    </div>
  );
};

export default Loading;
