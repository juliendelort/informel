

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // As soon as the site loads in the browser, register a global event listener
  try {
    fetch('https://ju2l0r-informelVisit.web.val.run').catch(() => {
      console.log('error calling visitor');
    });
  } catch (e) {
    console.log('error calling visitor');
  }
}
