const devices = [
  { id: "DEV01", name: "Điều hòa", powerWatts: 1500, isActive: true },
  { id: "DEV02", name: "Quạt", powerWatts: 60, isActive: true },
  { id: "DEV03", name: "Đèn", powerWatts: 40, isActive: true }
];

const findDeviceById = (devices, targetId) => {
  return devices.find((device) => device.id === targetId) || null;
};

const updateDeviceState = (devices, targetId, updateData) => {
  const targetDevice = findDeviceById(devices, targetId);

  if (targetDevice === null) {
    return false;
  }

  if (updateData.isActive !== undefined) {
    if (typeof updateData.isActive !== "boolean") {
      return false;
    }
    targetDevice.isActive = updateData.isActive;
  }

  if (updateData.powerWatts !== undefined) {
    if (
      typeof updateData.powerWatts !== "number" ||
      !Number.isFinite(updateData.powerWatts) ||
      updateData.powerWatts < 0
    ) {
      return false;
    }
    targetDevice.powerWatts = updateData.powerWatts;
  }

  return true;
};

const calculateActivePower = (devices) => {
  let totalPower = 0;

  devices.forEach((device) => {
    if (device.isActive === true) {
      totalPower += device.powerWatts;
    }
  });

  return totalPower;
};

console.log("===== 1. DANH SÁCH THIẾT BỊ BAN ĐẦU =====");
console.table(devices);
console.log("Tổng công suất ban đầu:", calculateActivePower(devices), "W");

console.log("\n===== 2. TẮT ĐIỀU HÒA DEV01 =====");
console.log("Kết quả cập nhật:", updateDeviceState(devices, "DEV01", {
  isActive: false
}));
console.table(devices);

console.log("\n===== 3. HẠ CÔNG SUẤT ĐÈN DEV03 VỀ 0W =====");
console.log("Kết quả cập nhật:", updateDeviceState(devices, "DEV03", {
  powerWatts: 0
}));
console.table(devices);

console.log("\n===== 4. KIỂM TRA THIẾT BỊ =====");
console.log("DEV01:", findDeviceById(devices, "DEV01"));
console.log("DEV02:", findDeviceById(devices, "DEV02"));
console.log("DEV03:", findDeviceById(devices, "DEV03"));
console.log("DEV99 không tồn tại:", findDeviceById(devices, "DEV99"));

console.log("\n===== 5. TỔNG CÔNG SUẤT SAU CẬP NHẬT =====");
console.log("Tổng công suất thiết bị đang bật:", calculateActivePower(devices), "W");
console.log("Kết quả mong đợi: 60 W");