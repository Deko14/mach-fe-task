import Image from 'next/image';
import { geistMono, geistSans } from '@/fonts/fonts';
import { Container } from '@/components/shared/container';

interface HeroProps {
  title: string;
  description: string;
  image: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
}

export const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <Container className="flex flex-grow justify-between items-center gap-5">
      <div>
        <h1 className={`${geistSans.variable} mb-6 text-4xl`}>{title}</h1>
        <p className={`${geistMono.variable}`}>{description}</p>
      </div>
      <Image
        src={`https:${image.fields.file.url}`}
        alt={image.fields.title}
        width={266}
        height={300}
        loading="eager"
      />
    </Container>
  );
};
