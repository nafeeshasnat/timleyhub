import TrelloIcon from "../../images/logo/trello-official.svg";

const IntegrationItem = ({ logo, title, description, learnMoreLink }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img src={logo} alt={`${title} logo`} className="w-16 h-16 mr-4" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{description}</p>
        <a href={learnMoreLink} className="text-indigo-600 hover:text-indigo-800">Learn more</a>
      </div>
      <button className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        SETUP
      </button>
    </div>
  );
};

const Integration = () => {
  const integrations = [
    {
      logo: TrelloIcon, 
      title: 'Trello',
      description: 'If you use Trello to manage projects, then you’re going to love this. You can now integrate with all versions of Trello.',
      learnMoreLink: 'https://trello.com/',
    },
  ];

  return (
    <div>
      {integrations.map((integration, index) => (
        <IntegrationItem key={index} {...integration} />
      ))}
    </div>
  );
};

export default Integration;