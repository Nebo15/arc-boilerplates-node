import exportObjectFields from '../helpers/exportObjectFields.js';

export let view_structure = {
  id: {
    title: "User ID",
    type: "MongoID",
    description: "Unique user ID"
  },
  name: {
    title: "User name",
    type: "string",
    description: "Full user name"
  },
  avatar: {
    title: "User ID",
    type: "MongoID",
    description: "Unique user ID"
  }
};

export default function(user) {
  return exportObjectFields(user, view_structure);
}
