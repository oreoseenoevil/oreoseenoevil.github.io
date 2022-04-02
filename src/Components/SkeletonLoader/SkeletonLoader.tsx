import { FC } from 'react';
import ContentLoader from 'react-content-loader';

interface SkeletonLoaderProps {
  height?: number | string;
  width?: number | string;
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({ children, height = '100%', width = '100%' }) => {
  return (
    <ContentLoader backgroundColor="#f0f0f0" foregroundColor="#dedede" height={height} width={width}>
      {children}
    </ContentLoader>
  );
};
