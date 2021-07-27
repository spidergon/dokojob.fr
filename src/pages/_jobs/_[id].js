// import { getAllJobIds, getJobData } from '@utils/jobs';

export default function Job({ jobData }) {
  return <p>{jobData.name}</p>;
}

// export async function getStaticPaths() {
//   const paths = getAllJobIds();

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const jobData = await getJobData(params.id);

//   return {
//     props: {
//       jobData,
//     },
//   };
// }
