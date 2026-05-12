const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-lg">
        Loading...
      </p>
    </div>
  );
};

export default Loader;