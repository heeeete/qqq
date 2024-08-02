import RenderHome from './RenderHome';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import getRecentProducts from './_lib/getRecentProducts';

export async function generateMetadata({ params }) {
  const product = await getRecentProducts();

  return {
    title: product ? `${product[0].title}ㅣKEYNUT` : 'KEYNUT',
    description: product ? `${product[0].description}` : '다양한 전자기기를 한눈에',
    openGraph: {
      title: product ? `${product[0].title}ㅣKEYNUT` : 'KEYNUT',
      description: product ? `${product[0].description}` : '상품을 찾을 수 없습니다.',
      images: [
        {
          url: product ? product[0].images[0] : `${process.env.NEXT_PUBLIC_BASE_URL}/keynut.png`,
          width: 100,
          height: 100,
          alt: 'KEYNUT Logo',
        },
      ],
    },
  };
}

export default async function Page() {
  console.log('HELLLLLLLLLLLLLLLLL');
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({ queryKey: ['recentProducts'], queryFn: getRecentProducts });
    console.log('recent Products prefetchQuery 실행');
  } catch (error) {
    console.error('recent Products prefetchQuery 실행 중 에러 발생:', error);
  }
  const dehydratedstate = dehydrate(queryClient);
  console.log('LOWWWWWWWWWWWWWWWWWWW');
  return (
    //HydrationBoundary 컴포넌트로 감싸주면 클라이언트 측에서 별도의 hydrate 호출 없이 서버 측에서 직렬화된 데이터를 자동으로 복원하여 사용
    <HydrationBoundary state={dehydratedstate}>
      {/* <ScrollRestoration /> */}
      <RenderHome />
    </HydrationBoundary>
  );
}
