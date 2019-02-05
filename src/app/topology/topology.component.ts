import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Network, DataSet } from 'vis';
import { ActivatedRoute, Data } from '@angular/router';
import { isNumber, isString } from 'util';

interface TopoNode {
  id: number | string;
}

interface TopoHostLink {
  source: number | string;
  target: number | string;
}

interface TopoLink {
  source: number | string;
  target: number | string;
  port: number;
}

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.css']
})
export class TopologyComponent implements OnInit {
  @ViewChild('topologyDiv') topoElement: ElementRef;

  toplogyData: any;
  assetData: any;

  constructor(private route: ActivatedRoute) {}

  private addGroup(node: { id: string | number; label: string }) {
    let group = null;
    const label = node.label;
    if (isNumber(node.id)) {
      group = 'FW';
    }
    if (isString(node.id)) {
      if (node.id === this.assetData.rr.ip) {
        group = 'RR';
      } else {
        this.assetData.rr.ses.forEach(
          (se: { ip: string; port: number; name: string; domain: string }) => {
            if (se.ip === node.id) {
              group = 'SE';
            }
          }
        );
        if (group === null) {
          group = 'CL';
        }
      }
    }

    return {
      ...node,
      label: group + ': ' + label,
      group
    };
  }

  ngOnInit() {

    this.route.data.subscribe((value: Data) => {
      console.log(value);
    });

    this.toplogyData = this.route.snapshot.data.topo;
    this.assetData = this.route.snapshot.data.assets;

    const nodes = new DataSet(
      this.toplogyData.nodes
        .map((e: TopoNode) => ({
          id: e.id,
          label: e.id.toString()
        }))
        .map(e => this.addGroup(e))
    );

    const edges = new DataSet(
      this.toplogyData.links
        .map((e: TopoLink | TopoHostLink) => ({
          from: e.source,
          to: e.target
        }))
        .filter((e: { from: any; to: any }) =>
            (isNumber(e.from) && isNumber(e.to) && e.from < e.to) ||
            (isNumber(e.from) && isNaN(e.to))
        ));

    // provide the data in the vis format
    const data = {
      nodes,
      edges
    };

    const options = {
      width: '100%',
      height: '500px',
      groups: {
        FW: {
          shape: 'image',
          image: 'assets/img/switch.png'
        },
        RR: {
          shape: 'image',
          image: 'assets/img/server.png'
        },
        CL: {
          shape: 'image',
          image: 'assets/img/pc-computer-with-monitor.png'
        },
        SE: {
          shape: 'image',
          image: 'assets/img/database.png'
        }
      }
    };

    // initialize your network!
    const network = new Network(this.topoElement.nativeElement, data, options);
  }
}
