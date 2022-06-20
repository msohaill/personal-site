import './style.scss';

const ProjectCard = () => {
  return (
    <div className='project-card'>
      <img src={require('../../../assets/images/projects/wrappedify.png')} className='project-picture' />
      <h2>Wrappedify</h2>
      <p>I did a lot of things, this thing does a lot of cool stuff and yay it has cool features omg yay</p>
    </div>
  );
};

export default ProjectCard;
