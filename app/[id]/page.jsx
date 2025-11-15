async function DynamicPage({ params }) {
  const { id } = await params;
  return <h1>Dynamic Page for ID: {id}</h1>;
}
export default DynamicPage;
