// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Tracking {
    enum RamStatus { ENSAMBLADO, EN_TRANSITO, ENTREGADO}

    struct Ram {
        address sender;
        address receiver;
        uint256 fecha;
        uint256 fechaEntrega;
        uint256 almacenamiento;
        uint256 precio;
        RamStatus estado;
        bool pagado;
    }

    mapping(address => Ram[]) public rams;
    uint256 public ramContador;

    struct TypeRam {
        address sender;
        address receiver;
        uint256 fecha;
        uint256 fechaEntrega;
        uint256 almacenamiento;
        uint256 precio;
        RamStatus estado;
        bool pagado;
    }

    TypeRam[] typeRams;

    event RamCreada(address indexed sender, address indexed receiver, uint256 fecha, uint256 almacenamiento, uint256 precio);
    event RamEnTransito(address indexed sender, address indexed receiver, uint256 fecha);
    event RamEntregada(address indexed sender, address indexed receiver, uint256 fechaEntrega);
    event RamPagada(address indexed sender, address indexed receiver, uint256 amount);

    constructor() {
        ramContador = 0;
    }

    
    
    function crearRam(address _receiver, uint256 _fecha, uint256 _almacenamiento, uint256 _precio) public payable {
        require(msg.value == _precio, "El monto del pago debe coincidir con el precio.");
        
        Ram memory ram = Ram(msg.sender, _receiver, _fecha, 0, _almacenamiento, _precio, RamStatus.ENSAMBLADO, false);

        rams[msg.sender].push(ram);
        ramContador++;

        typeRams.push(
            TypeRam(
                msg.sender, 
                _receiver, 
                _fecha, 
                0, 
                _almacenamiento, 
                _precio, 
                RamStatus.ENSAMBLADO, 
                false
            )
        );
        
        emit RamCreada(msg.sender, _receiver, _fecha, _almacenamiento, _precio);
    }

    function iniciarEnvioRam(address _sender, address _receiver, uint256 _index) public {
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];
        
        require(ram.receiver == _receiver, "Invalid receiver.");
        require(ram.estado == RamStatus.ENSAMBLADO, "Ram ensamblada y lista.");

        ram.estado = RamStatus.EN_TRANSITO;
        typeRam.estado = RamStatus.EN_TRANSITO;

        emit RamEnTransito(_sender, _receiver, ram.fecha);
    }

    function envioRamCompleto(address _sender, address _receiver, uint256 _index) public {
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];

        require(ram.receiver == _receiver, "Invalid receiver.");
        require(ram.estado == RamStatus.EN_TRANSITO, "Ram no en transito.");
        require(!ram.pagado, "ram pagada.");

         ram.estado = RamStatus.ENTREGADO;
         typeRam.estado = RamStatus.ENTREGADO;
         typeRam.fechaEntrega = block.timestamp;
         ram.fechaEntrega = block.timestamp;

        uint256 amount = ram.precio;

        payable(ram.sender).transfer(amount);

        ram.pagado = true;
        typeRam.pagado = true;

        emit RamEntregada(_sender, _receiver, ram.fechaEntrega);
        emit RamPagada(_sender, _receiver, amount);
    }

    function conseguirRam(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, RamStatus, bool) {
        Ram memory ram = rams[_sender][_index];
        return (ram.sender, ram.receiver, ram.fecha, ram.fechaEntrega, ram.almacenamiento, ram.precio, ram.estado, ram.pagado);
    }

    function conseguirRamContador(address _sender) public view returns (uint256) {
        return rams[_sender].length;
    }

    function getAllTransaccions() public view returns (TypeRam[] memory) {
        return typeRams;
    }
    
}