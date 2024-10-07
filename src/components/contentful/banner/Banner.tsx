interface BannerProps {
  title: string;
  date: string;
}

export const Banner = ({ title, date }: BannerProps) => {
  return (
    <div className="bg-gradient-to-r from-[#4EB5E3] via-[#FBE500] to-[#EF5651] rounded-lg p-4 mt-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-800 text-sm mt-4">
        Posted on: {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
};
