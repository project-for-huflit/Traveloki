'use strict'

const { Schema, model } = require("mongoose");

const KhachHangSchema = new Schema({
  MaCus: {
    type: String,
    required: true,

    maxlength: 5,
  },
  TenKH: {
    type: String,
    maxlength: 100,
  },
  Sdt: {
    type: String,
    maxlength: 10,
  },
});

const DanhSachSanBaySchema = new Schema({
  MaSB: { type: String, required: true },
  TenSanBay: { type: String, required: true, maxlength: 100 },
  ThanhPho: { type: String, required: true, maxlength: 100 },
});

const TuyenSchema = new Schema({
  MaTuyen: { type: String, required: true, maxlength: 5 },
  DiemSanBay: { type: String, ref: "DanhSachSanBay", required: true },
  DiemKetThuc: { type: String, maxlength: 300, required: true },
  ThoiGianKhoiHanh: { type: Date, required: true },
  ThoiGianKetThuc: { type: Date, required: true },
});

const PhuongTienSchema = new Schema({
  MaPT: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, required: true, ref: "Tuyen" },
  MaLoai: { type: Boolean, required: true },
  TenPhuongTien: { type: String, required: true, maxlength: 100 },
  SoGheToiDa: { type: Number, required: true },
  image: { type: String, required: true },
  TenCty: { type: String, required: true, maxlength: 100 },
});

const TramDungSchema = new Schema({
  MaTram: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, ref: "Tuyen" },
  DiaChi: { type: String, required: true, maxlength: 100 },
  SoKM: { type: Number, required: true },
  GiaTienVe: { type: Number, required: true },
  GiaTienVeTau: { type: Number, required: true },
});

const ChiTietXeOtoSchema = new Schema({
  MaDetailCar: { type: String, required: true },
  TenHangXe: { type: String, required: true, maxlength: 100 },
  TenChuSoHuu: { type: String, required: true, maxlength: 100 },
  SoHanhLyToiDa: { type: Number, required: true },
  BienSoXe: { type: String, required: true, maxlength: 10 },
  CongTy: { type: String, required: true, maxlength: 100 },
  SDT_TaiXe: { type: String, required: true, maxlength: 10 },
  SoGheToiDa: { type: Number, required: true },
  SoTien_1km: { type: Number, required: true },
  Image: { type: String, required: true },
  MaSB: { type: String, ref: "DanhSachSanBay" },
});

const DatXeOtoSchema = new Schema({
  MaDX: { type: String, required: true, maxlength: 5 },
  MaDetailCar: { type: String, ref: "ChiTietXeOto" },
  Sdt: { type: String, ref: "KhachHang" },
  MaTram: { type: String, ref: "TramDung" },
  DiemSanBay: { type: String, required: true, maxlength: 100 },
  DiemDon_Tra: { type: String, required: true, maxlength: 100 },
  NgayGioDat: { type: String, required: true },
  ThanhTien: { type: Number, required: true },
  Trangthai: { type: Boolean, required: true },
  Description: { type: String, maxlength: 500 },
});

const AppraiseCarSchema = new Schema({
  MaDX: { type: String, ref: "DatXeOto" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const PhieuDatTauSchema = new Schema({
  MaVeTau: { type: String, required: true, maxlength: 5 },
  MaPT: { type: String, ref: "PhuongTien" },
  MaTram: { type: String, ref: "TramDung" },
  SLVeNguoiLon: { type: Number, required: true },
  SLVeTreEm: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: String, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseTrainSchema = new Schema({
  MaTau: { type: String, ref: "PhieuDatTau" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const PhieuDatXeBusSchema = new Schema({
  MaVeBus: { type: String, required: true, maxlength: 5 },
  MaPT: { type: String, ref: "PhuongTien" },
  MaTram: { type: String, ref: "TramDung" },
  SLVe: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseBusSchema = new Schema({
  MaBus: { type: String, ref: "PhieuDatXeBus" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, require: true },
  NoiDung: { type: String, require: true, maxlength: 500 },
});

const LichSuDatXeOtoSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "DatXeOto" },
  Date: { type: String },
});

const LichSuDatTauSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatTau" },
  Date: { type: Date },
});

const LichSuDatXeBusSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatXeBus" },
  Date: { type: String },
});

const counterSchema = new Schema({
  _id: String,
  seq: Number,
});

const KhachHang = model("KhachHang", KhachHangSchema);
const DanhSachSanBay = model("DanhSachSanBay", DanhSachSanBaySchema);
const Tuyen = model("Tuyen", TuyenSchema);
const PhuongTien = model("PhuongTien", PhuongTienSchema);
const TramDung = model("TramDung", TramDungSchema);
const ChiTietXeOto = model("ChiTietXeOto", ChiTietXeOtoSchema);
const DatXeOto = model("DatXeOto", DatXeOtoSchema);
const AppraiseCar = model("AppraiseCar", AppraiseCarSchema);
const PhieuDatTau = model("PhieuDatTau", PhieuDatTauSchema);
const AppraiseTrain = model("AppraiseTrain", AppraiseTrainSchema);
const PhieuDatXeBus = model("PhieuDatXeBus", PhieuDatXeBusSchema);
const AppraiseBus = model("AppraiseBus", AppraiseBusSchema);
const LichSuDatXeOto = model("LichSuDatXeOto", LichSuDatXeOtoSchema);
const LichSuDatTau = model("LichSuDatTau", LichSuDatTauSchema);
const LichSuDatXeBus = model("LichSuDatXeBus", LichSuDatXeBusSchema);

const CounterLSB = model("CounterLSB", counterSchema);
const CounterTuyen = model("CounterTuyen", counterSchema);
const CounterPhuongTien = model("CounterPhuongTien", counterSchema);
const CounterChitietxe = model("CounterChitietxe", counterSchema);
const CounterTramDung = model("CounterTramDung", counterSchema);
const CounterDatXe = model("CounterDatXe", counterSchema);
const CounterDatTau = model("CounterDatTau", counterSchema);
const CounterDatBuyt = model("CounterDatBuyt", counterSchema);

module.exports = {
  KhachHang,
  DanhSachSanBay,
  Tuyen,
  PhuongTien,
  TramDung,
  ChiTietXeOto,
  DatXeOto,
  AppraiseCar,
  PhieuDatTau,
  AppraiseTrain,
  PhieuDatXeBus,
  AppraiseBus,
  LichSuDatXeOto,
  LichSuDatTau,
  LichSuDatXeBus,

  CounterLSB,
  CounterTuyen,
  CounterPhuongTien,
  CounterChitietxe,
  CounterTramDung,
  CounterDatXe,
  CounterDatTau,
  CounterDatBuyt,
};
