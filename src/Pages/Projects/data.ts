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

import permission from 'assets/image/permission.png';
import permissionLow from 'assets/image/permission-low-res.png';
import permLogin from 'assets/image/perm-login.png';
import permLoginLow from 'assets/image/perm-login-low-res.png';
import dailyEarn from 'assets/image/daily-earn.png';
import dailyEarnLow from 'assets/image/daily-earn-low-res.png';
import wallet from 'assets/image/wallet.png';
import walletLow from 'assets/image/wallet-low-res.png';

export const data = [
  {
    name: 'Permission',
    role: 'Software Developer',
    link: 'https://permission.io/',
    projects: [
      {
        name: 'Permission.io',
        src: permission,
        lowRes: permissionLow
      },
      {
        name: 'my.permission.io',
        src: permLogin,
        lowRes: permLoginLow
      },
      {
        name: 'Daily Earn',
        src: dailyEarn,
        lowRes: dailyEarnLow
      },
      {
        name: 'Wallet',
        src: wallet,
        lowRes: walletLow
      }
    ]
  },
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
