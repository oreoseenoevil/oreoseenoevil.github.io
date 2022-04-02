import { FC } from 'react';
import ContentLoader from 'react-content-loader';

interface SkeletonLoaderProps {
  height?: number | string;
  width?: number | string;
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({ children, height = '100%', width = '100%' }) => {
  return (
    <ContentLoader backgroundColor="#d9d9d9" foregroundColor="#ededed" height={height} width={width} speed={2}>
      {children}
    </ContentLoader>
  );
};
