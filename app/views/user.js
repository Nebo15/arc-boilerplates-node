import exportObjectFields from './../../helpers/exportObjectFields';

export let viewStructure = {
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

export default function (user) {
  return exportObjectFields(user, viewStructure);
}
