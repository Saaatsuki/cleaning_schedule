const getCleanData = async (classId) => {
  const response = await fetch(`http://210.101.236.158:8081/api/clean/all?classId=${classId}`);
  const data = await response.json();
  return data;
};

export default getCleanData;
