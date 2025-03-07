"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var auth_1 = require("../lib/auth");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, skills, employer, _a, _b, jobSeeker1, _c, _d, jobSeeker2, _e, _f, job1, job2;
        var _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0: 
                // Clean up existing data
                return [4 /*yield*/, prisma.application.deleteMany()];
                case 1:
                    // Clean up existing data
                    _o.sent();
                    return [4 /*yield*/, prisma.education.deleteMany()];
                case 2:
                    _o.sent();
                    return [4 /*yield*/, prisma.job.deleteMany()];
                case 3:
                    _o.sent();
                    return [4 /*yield*/, prisma.skill.deleteMany()];
                case 4:
                    _o.sent();
                    return [4 /*yield*/, prisma.category.deleteMany()];
                case 5:
                    _o.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 6:
                    _o.sent();
                    return [4 /*yield*/, Promise.all([
                            prisma.category.create({
                                data: {
                                    name: 'Software Development',
                                    description: 'Software development and engineering positions',
                                },
                            }),
                            prisma.category.create({
                                data: {
                                    name: 'Data Science',
                                    description: 'Data science, analytics, and machine learning positions',
                                },
                            }),
                            prisma.category.create({
                                data: {
                                    name: 'Design',
                                    description: 'UI/UX and graphic design positions',
                                },
                            }),
                        ])];
                case 7:
                    categories = _o.sent();
                    return [4 /*yield*/, Promise.all([
                            prisma.skill.create({ data: { name: 'JavaScript' } }),
                            prisma.skill.create({ data: { name: 'Python' } }),
                            prisma.skill.create({ data: { name: 'React' } }),
                            prisma.skill.create({ data: { name: 'Node.js' } }),
                            prisma.skill.create({ data: { name: 'SQL' } }),
                            prisma.skill.create({ data: { name: 'UI/UX Design' } }),
                        ])];
                case 8:
                    skills = _o.sent();
                    _b = (_a = prisma.user).create;
                    _g = {};
                    _h = {
                        name: 'Tech Solutions Inc.',
                        email: 'employer@example.com'
                    };
                    return [4 /*yield*/, (0, auth_1.hashPassword)('employer123')];
                case 9: return [4 /*yield*/, _b.apply(_a, [(_g.data = (_h.password = _o.sent(),
                            _h.role = client_1.UserRole.EMPLOYER,
                            _h.bio = 'Leading technology solutions provider',
                            _h.location = 'Singapore',
                            _h),
                            _g)])];
                case 10:
                    employer = _o.sent();
                    _d = (_c = prisma.user).create;
                    _j = {};
                    _k = {
                        name: 'John Developer',
                        email: 'john@example.com'
                    };
                    return [4 /*yield*/, (0, auth_1.hashPassword)('password123')];
                case 11: return [4 /*yield*/, _d.apply(_c, [(_j.data = (_k.password = _o.sent(),
                            _k.role = client_1.UserRole.JOBSEEKER,
                            _k.bio = 'Full-stack developer with 3 years of experience',
                            _k.location = 'Malaysia',
                            _k.experience = 3,
                            _k.skills = {
                                connect: [
                                    { id: skills[0].id }, // JavaScript
                                    { id: skills[2].id }, // React
                                ],
                            },
                            _k.education = {
                                create: {
                                    institution: 'University of Technology',
                                    degree: 'Bachelor',
                                    field: 'Computer Science',
                                    startDate: new Date('2018-09-01'),
                                    endDate: new Date('2022-06-30'),
                                },
                            },
                            _k),
                            _j)])];
                case 12:
                    jobSeeker1 = _o.sent();
                    _f = (_e = prisma.user).create;
                    _l = {};
                    _m = {
                        name: 'Alice Designer',
                        email: 'alice@example.com'
                    };
                    return [4 /*yield*/, (0, auth_1.hashPassword)('password123')];
                case 13: return [4 /*yield*/, _f.apply(_e, [(_l.data = (_m.password = _o.sent(),
                            _m.role = client_1.UserRole.JOBSEEKER,
                            _m.bio = 'UI/UX designer passionate about user experience',
                            _m.location = 'Singapore',
                            _m.experience = 2,
                            _m.skills = {
                                connect: [
                                    { id: skills[5].id }, // UI/UX Design
                                ],
                            },
                            _m.education = {
                                create: {
                                    institution: 'Design Academy',
                                    degree: 'Bachelor',
                                    field: 'Digital Design',
                                    startDate: new Date('2019-09-01'),
                                    endDate: new Date('2023-06-30'),
                                },
                            },
                            _m),
                            _l)])];
                case 14:
                    jobSeeker2 = _o.sent();
                    return [4 /*yield*/, prisma.job.create({
                            data: {
                                title: 'Senior Frontend Developer',
                                description: 'Looking for an experienced frontend developer with React expertise',
                                companyName: 'Tech Solutions Inc.',
                                location: 'Singapore',
                                salary: '$6,000 - $8,000',
                                type: client_1.JobType.FULL_TIME,
                                experienceLevel: 'Senior',
                                employerId: employer.id,
                                categoryId: categories[0].id,
                                skills: {
                                    connect: [
                                        { id: skills[0].id }, // JavaScript
                                        { id: skills[2].id }, // React
                                    ],
                                },
                                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                            },
                        })];
                case 15:
                    job1 = _o.sent();
                    return [4 /*yield*/, prisma.job.create({
                            data: {
                                title: 'UI/UX Designer',
                                description: 'Seeking a creative UI/UX designer for our product team',
                                companyName: 'Tech Solutions Inc.',
                                location: 'Remote',
                                salary: '$4,000 - $6,000',
                                type: client_1.JobType.FULL_TIME,
                                experienceLevel: 'Mid-Level',
                                employerId: employer.id,
                                categoryId: categories[2].id,
                                skills: {
                                    connect: [
                                        { id: skills[5].id }, // UI/UX Design
                                    ],
                                },
                                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            },
                        })];
                case 16:
                    job2 = _o.sent();
                    // Create applications
                    return [4 /*yield*/, prisma.application.create({
                            data: {
                                userId: jobSeeker1.id,
                                jobId: job1.id,
                                status: client_1.ApplicationStatus.PENDING,
                                coverLetter: 'I am very interested in this position...',
                            },
                        })];
                case 17:
                    // Create applications
                    _o.sent();
                    return [4 /*yield*/, prisma.application.create({
                            data: {
                                userId: jobSeeker2.id,
                                jobId: job2.id,
                                status: client_1.ApplicationStatus.REVIEWING,
                                coverLetter: 'I would love to join your design team...',
                            },
                        })];
                case 18:
                    _o.sent();
                    console.log('Seed data created successfully');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
