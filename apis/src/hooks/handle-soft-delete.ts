import {Hook, HookContext, Service} from '@feathersjs/feathers';
import { softDelete } from 'feathers-hooks-common';

const handleSoftDelete =
  (deleteKey = 'deleted', deleteValue: any = true, setDeletedByAndDeletedAt = true): Hook =>
    (context: HookContext): Promise<HookContext<any, Service<any>> | void> | HookContext<any, Service<any>> | void => {
      const { params } = context;

      const removeData = { [deleteKey]: deleteValue };
      const deletedQuery = { [deleteKey]: { $ne: deleteValue } };

      if (setDeletedByAndDeletedAt) {
        removeData.deletedBy = params.user?._id;
        removeData.deletedAt = new Date();
      }

      return softDelete({
        removeData: () => {
          return removeData;
        },
        deletedQuery: () => {
          return deletedQuery;
        },
      })(context);
    };

export default handleSoftDelete;
