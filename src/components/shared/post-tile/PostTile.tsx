import Link from 'next/link';

interface PostTileProps {
  id: number;
  title: string;
  body: string;
}

export const PostTile = ({ id, title, body }: PostTileProps) => {
  return (
    <Link href={`/posts/${id}`}>
      <div className="border border-gray-700 rounded-lg p-5 shadow-lg bg-gray-900 h-40 cursor-pointer">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">Post #{id}</h2>
        <h3 className="text-lg font-bold mb-2 text-gray-200">{title}</h3>
        <p
          className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap"
          title={body}
        >
          {body}
        </p>
      </div>
    </Link>
  );
};
