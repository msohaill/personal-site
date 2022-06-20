import './style.scss';

const MainSection = ({
  heading,
  headingId,
  children,
}: {
  heading: string;
  headingId: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='main-section'>
      <h1 className='section-title' id={headingId}>
        {heading}
      </h1>
      {children}
    </div>
  );
};

export default MainSection;
