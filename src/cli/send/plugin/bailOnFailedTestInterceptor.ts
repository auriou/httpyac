import { HookTriggerContext } from 'hookpoint';

import * as models from '../../../models';

export const bailOnFailedTestInterceptor = {
  id: 'bailOnFailed',
  afterTrigger: async function bail(hookContext: HookTriggerContext<[models.ProcessorContext], boolean>) {
    const context = hookContext.args[0];
    const failedTest = context.httpRegion.testResults?.find?.(obj => !obj.result);
    if (failedTest) {
      throw failedTest.error || new Error('bail on failed test');
    }
    return true;
  },
};
