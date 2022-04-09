import skillai from 'assets/image/skill-ai.png';
import connectorStore from 'assets/image/connector-store.png';
import mlops from 'assets/image/mlops.png';
import futureOrg from 'assets/image/future-org.png';
import humanai from 'assets/image/human-ai-hub.png';
import data2cloud from 'assets/image/data2cloud.png';
import landasia from 'assets/image/landasia.png';

import skillaiLow from 'assets/image/skill-ai-low-res.png';
import connectorStoreLow from 'assets/image/connector-store-low-res.png';
import mlopsLow from 'assets/image/mlops-low-res.png';
import futureOrgLow from 'assets/image/future-org-low-res.png';
import humanaiLow from 'assets/image/human-ai-hub-low-res.png';
import data2cloudLow from 'assets/image/data2cloud-low-res.png';
import landasiaLow from 'assets/image/landasia-low-res.png';

export const data = [
  {
    name: 'Solution.AI',
    role: 'React Developer',
    link: 'https://www.accenture.com/us-en/services/applied-intelligence/solutions-ai-talent-skilling',
    projects: [
      {
        name: 'Skill.AI',
        src: skillai,
        lowRes: skillaiLow
      },
      {
        name: 'Connector Store',
        src: connectorStore,
        lowRes: connectorStoreLow
      },
      {
        name: 'MLOps',
        src: mlops,
        lowRes: mlopsLow
      },
      {
        name: 'Future Org',
        src: futureOrg,
        lowRes: futureOrgLow
      },
      {
        name: 'Human.AI Hub',
        src: humanai,
        lowRes: humanaiLow
      },
      {
        name: 'Data2Cloud',
        src: data2cloud,
        lowRes: data2cloudLow
      }
    ]
  },
  {
    name: 'Landasia',
    role: 'Web Developer',
    link: 'https://landasia.ph/',
    projects: [
      {
        name: 'Landasia',
        src: landasia,
        lowRes: landasiaLow
      }
    ]
  }
];
