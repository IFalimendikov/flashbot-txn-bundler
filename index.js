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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var ethers_1 = require("ethers");
var ethers_provider_bundle_1 = require("@flashbots/ethers-provider-bundle");
var process_1 = require("process");
require('dotenv').config();
var FLASHBOTS_URL = "https://relay.flashbots.net";
var _a = process.env, HACKED_WALLET = _a.HACKED_WALLET, RESCUER = _a.RESCUER;
if (!HACKED_WALLET || !RESCUER) {
    throw new Error("Env's are missing");
}
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, authSigner, flashbotProvider, rescuer, hackedWallet, abi, iface;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                provider = new ethers_1.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
                authSigner = ethers_1.Wallet.createRandom();
                return [4 /*yield*/, ethers_provider_bundle_1.FlashbotsBundleProvider.create(provider, authSigner, FLASHBOTS_URL)];
            case 1:
                flashbotProvider = _a.sent();
                rescuer = new ethers_1.Wallet(RESCUER).connect(provider);
                hackedWallet = new ethers_1.Wallet(HACKED_WALLET).connect(provider);
                abi = ["function transferOwnership (address) public"];
                iface = new ethers_1.utils.Interface(abi);
                provider.on('block', function (blockNo) { return __awaiter(void 0, void 0, void 0, function () {
                    var targetBlock, resp, response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('block minted', blockNo, rescuer.address);
                                targetBlock = blockNo + 2;
                                return [4 /*yield*/, flashbotProvider.sendBundle([
                                        {
                                            signer: rescuer,
                                            transaction: {
                                                chainId: 1,
                                                type: 2,
                                                to: hackedWallet.address,
                                                value: ethers_1.utils.parseEther('0.01'),
                                                maxFeePerGas: ethers_1.utils.parseUnits('35', 'gwei'),
                                                maxPriorityFeePerGas: ethers_1.utils.parseUnits('13', 'gwei')
                                            }
                                        },
                                        {
                                            signer: hackedWallet,
                                            transaction: {
                                                chainId: 1,
                                                type: 2,
                                                to: "0xc019C0d0DaAf9CcEC4277c0Dba0BF51348aBBE3b",
                                                gasLimit: '30000',
                                                data: iface.encodeFunctionData("transferOwnership", [
                                                    rescuer.address
                                                ]),
                                                maxFeePerGas: ethers_1.utils.parseUnits('35', 'gwei'),
                                                maxPriorityFeePerGas: ethers_1.utils.parseUnits('13', 'gwei')
                                            }
                                        },
                                        {
                                            signer: hackedWallet,
                                            transaction: {
                                                chainId: 1,
                                                type: 2,
                                                to: "0x07493F6d027De62A9A84D1F6359c85F66D55fF70",
                                                gasLimit: '30000',
                                                data: iface.encodeFunctionData("transferOwnership", [
                                                    rescuer.address
                                                ]),
                                                maxFeePerGas: ethers_1.utils.parseUnits('35', 'gwei'),
                                                maxPriorityFeePerGas: ethers_1.utils.parseUnits('13', 'gwei')
                                            }
                                        },
                                        {
                                            signer: hackedWallet,
                                            transaction: {
                                                chainId: 1,
                                                type: 2,
                                                to: "0x275Af81Cd01C435898EbF243dF609cb923c362ee",
                                                gasLimit: '30000',
                                                data: iface.encodeFunctionData("transferOwnership", [
                                                    rescuer.address
                                                ]),
                                                maxFeePerGas: ethers_1.utils.parseUnits('35', 'gwei'),
                                                maxPriorityFeePerGas: ethers_1.utils.parseUnits('13', 'gwei')
                                            }
                                        }
                                    ], targetBlock)];
                            case 1:
                                resp = _a.sent();
                                if ('error' in resp) {
                                    console.log(resp.error.message);
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, resp.wait()];
                            case 2:
                                response = _a.sent();
                                if (response === ethers_provider_bundle_1.FlashbotsBundleResolution.BundleIncluded) {
                                    console.log('Included in block no:', targetBlock);
                                    (0, process_1.exit)(0);
                                }
                                else if (response === ethers_provider_bundle_1.FlashbotsBundleResolution.BlockPassedWithoutInclusion) {
                                    console.log('Not included block no:', targetBlock);
                                }
                                else if (response === ethers_provider_bundle_1.FlashbotsBundleResolution.AccountNonceTooHigh) {
                                    console.log('Nonce high');
                                    (0, process_1.exit)(1);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
run();
