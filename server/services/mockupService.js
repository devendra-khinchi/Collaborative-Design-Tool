import { Mockup } from "../models/Mockup.js";

const findMockupsByOwnerIdSortedByCreatedAtDesc = async (ownerId) => {
  const mockups = await Mockup.find({ owner: ownerId }).sort({ createdAt: -1 });
  return mockups;
};

const findMockupByIdAndPopulateOwnerData = async (mockupId) => {
  const mockup = await Mockup.findById(mockupId).populate(
    "owner",
    "_id name email",
  );
  return mockup;
};

const findMockupById = async (mockupId) => {
  const mockup = await Mockup.findById(mockupId);
  return mockup;
};

const createMockup = async (mockupData) => {
  const newMockup = new Mockup(mockupData);
  const createdMockup = await newMockup.save();
  return createdMockup;
};

const deleteMockupById = async (mockupId) => {
  const deletedMockup = await Mockup.findByIdAndDelete(mockupId);
  return deletedMockup;
};

const mockupService = {
  findMockupsByOwnerIdSortedByCreatedAtDesc,
  findMockupByIdAndPopulateOwnerData,
  findMockupById,
  createMockup,
  deleteMockupById,
};

export default mockupService;
